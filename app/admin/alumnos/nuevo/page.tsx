'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createStudent } from '../actions'

export default function NuevoAlumnoPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  function handleSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const result = await createStudent(formData)
      if (result?.error) {
        setError(result.error)
        return
      }
      setSuccess(true)
      setTimeout(() => router.push('/admin/alumnos'), 1200)
    })
  }

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-semibold">Nuevo alumno</h1>
      <p className="mt-1 text-sm text-gray-500">
        Se le va a enviar un email de invitación para que cree su propia contraseña.
      </p>

      <form action={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Nombre completo</label>
          <input
            name="full_name"
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Teléfono (opcional)</label>
          <input
            name="phone"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-700">Alumno invitado correctamente ✓</p>}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {isPending ? 'Enviando invitación...' : 'Invitar alumno'}
        </button>
      </form>
    </div>
  )
}
