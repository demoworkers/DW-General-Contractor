import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useForm } from 'react-hook-form'

import { auth } from '../../lib/mutations'

import { Logo } from '../components/Logo'
import { Button } from '../components/Button'
import { Checkbox, TextField } from '../components/Fields'

const Signup = () => {
  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({})

  const onSubmit = async (data) => {
    const { firstName, email, password, acceptTerms } = data

    let error = null

    if (firstName.length === 0 || email.length === 0 || password.length === 0) {
      error = 'Please fill out the complete form'
    } else if (password.length < 8 || password.length > 30) {
      error = 'Password length should be between 8 and 30 characters'
    } else if (!acceptTerms) {
      error = 'You must accept the terms and conditions'
    }

    if (error) {
      setErrorMessage(error)
      return
    }

    setErrorMessage(null)

    const user = await auth('signup', { data })
    router.push('/pending-verification')
  }

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Logo className="w-auto h-12 mx-auto" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
            Sign up to get started
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-blue-600 visited:text-blue-600 hover:text-blue-500"
            >
              Login
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            {errorMessage && (
              <div
                className="px-4 py-3 mb-4 text-xs text-red-700 bg-red-100 border border-red-400 rounded"
                role="alert"
              >
                {errorMessage}
              </div>
            )}
            <form
              className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2"
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                label="First name"
                id="first_name"
                name="first_name"
                type="text"
                autoComplete="given-name"
                {...register('firstName')}
              />
              <TextField
                label={
                  <>
                    Last name <span className="font-light">(optional)</span>
                  </>
                }
                id="last_name"
                name="last_name"
                type="text"
                autoComplete="family-name"
                {...register('lastName')}
              />
              <TextField
                className="col-span-full"
                label="Email address"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                {...register('email')}
              />
              <TextField
                className="col-span-full"
                label="Password"
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                {...register('password')}
              />
              <Checkbox
                className="flex flex-wrap items-center col-span-full"
                label={
                  <>
                    I agree to the{' '}
                    <Link
                      href="terms-of-service"
                      target="_blank"
                      className="underline"
                    >
                      terms of service
                    </Link>{' '}
                    and{' '}
                    <Link href="privacy" target="_blank" className="underline">
                      privacy policy
                    </Link>
                    .
                  </>
                }
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                {...register('acceptTerms')}
              />

              <div className="col-span-full">
                <Button
                  type="submit"
                  variant="solid"
                  color="slate"
                  className="w-full"
                  isLoading={isSubmitting}
                >
                  <span>Sign up</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

Signup.authPage = true

export default Signup
