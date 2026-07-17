import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AlumnosPage() {
  const supabase = await createClient()
  const { data: students } = await supabase
    .from('profiles')
    .select('id, full_name, email, phone, active, created_at')
    .contains('roles', ['student'])
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Alumnos</h1>
        <Link
          href="/admin/alumnos/nuevo"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white"
        >
          + Nuevo alumno
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Teléfono</th>
              <th className="px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((s) => (
              <tr key={s.id} className="border-t border-gray-100">
                <td className="px-4 py-2">{s.full_name}</td>
                <td className="px-4 py-2">{s.email}</td>
                <td className="px-4 py-2">{s.phone ?? '—'}</td>
                <td className="px-4 py-2">
                  {s.active ? (
                    <span className="text-green-700">Activo</span>
                  ) : (
                    <span className="text-gray-400">Inactivo</span>
                  )}
                </td>
              </tr>
            ))}
            {(!students || students.length === 0) && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                  Todavía no hay alumnos cargados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
