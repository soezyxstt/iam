'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

import { GlassCard } from '@/components/ui/glass-card'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Kesalahan Server Internal',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Terjadi kesalahan.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="container lg:max-w-[48rem]">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <GlassCard data-theme="dark" variant="stripes" contentClassName="p-6 md:p-8 lg:p-10">
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <div className="text-white prose prose-invert max-w-none py-6">
              <RichText data={confirmationMessage} className="text-white" enableGutter={false} />
            </div>
          )}
          {isLoading && !hasSubmitted && (
            <div className="text-center py-12">
              <p className="text-white/70 text-sm animate-pulse">Memuat, harap tunggu...</p>
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-sm">
              {`${error.status || '500'}: ${error.message || ''}`}
            </div>
          )}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-wrap -mx-2 gap-y-6">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                      return (
                        <Field
                          key={index}
                          form={formFromProps}
                          {...field}
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                        />
                      )
                    }
                    return null
                  })}
              </div>

              <div className="pt-4">
                <Button
                  form={formID}
                  type="submit"
                  variant="secondary"
                  size="lg"
                  scaleOnHover={true}
                  className="w-full justify-center md:w-auto md:px-14 md:h-12"
                >
                  {submitButtonLabel}
                </Button>
              </div>
            </form>
          )}
        </FormProvider>
      </GlassCard>
    </div>
  )
}
