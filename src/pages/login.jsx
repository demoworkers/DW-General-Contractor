import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useForm } from 'react-hook-form'

import { auth } from '../../lib/mutations'

import { Logo } from '../components/Logo'
import { Button } from '../components/Button'
import { TextField } from '../components/Fields'

const Login = () => {
  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({})

  const onSubmit = async (data) => {
    const { email, password } = data

    let error = null

    if (email.length === 0 || password.length === 0) {
      error = 'Please fill out the credentials'
    } else if (password.length < 8 || password.length > 30) {
      error = 'Password length should be between 8 and 30 characters'
    }

    if (error) {
      setErrorMessage(error)
      return
    }

    try {
      await auth('login', { email, password })
    } catch (e) {
      if (e) {
        setErrorMessage(e)
        return
      }
    }

    router.push('/projects')
  }

  return (
    <>
      <Head>
        <title>Log In</title>
      </Head>
      <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Logo className="w-auto h-12 mx-auto" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
            Log in to your account
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-medium text-blue-600 visited:text-blue-600 hover:text-blue-500"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
            >
              {errorMessage && (
                <div
                  className="px-4 py-3 text-xs text-red-700 bg-red-100 border border-red-400 rounded"
                  role="alert"
                >
                  {errorMessage}
                </div>
              )}
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
                autoComplete="password"
                {...register('password')}
                error={errors.password}
              />

              <Button
                type="submit"
                variant="solid"
                color="slate"
                className="w-full"
                isLoading={isSubmitting}
              >
                <span>Sign in</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

Login.authPage = true

export default Login
