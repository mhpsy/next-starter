'use client'

import { mergeExcelFiles } from '@/api/handle_excel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from '@/i18n/navigation'
import { useState } from 'react'

export default function HandleExcelPage() {
  const [files, setFiles] = useState<File[]>([])
  const [keyName, setKeyName] = useState('')
  const [newKeyName, setNewKeyName] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setResult('')

    if (files.length === 0) {
      setError('请选择至少一个Excel文件')
      return
    }

    if (!keyName.trim()) {
      setError('请输入要合并的列名')
      return
    }

    if (!newKeyName.trim()) {
      setError('请输入要转换为的列名')
      return
    }

    try {
      const csvContent = await mergeExcelFiles(files, keyName, newKeyName)
      setResult(csvContent)
    }
    catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Excel文件合并工具</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">选择Excel文件：</label>
          <Input
            type="file"
            multiple
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-2">输入要合并的列名：</label>
          <Input
            type="text"
            value={keyName}
            onChange={e => setKeyName(e.target.value)}
            className="w-full"
            placeholder="例如：name"
          />
        </div>

        <div>
          <label className="block mb-2">输入要转换为的列名：</label>
          <Input
            type="text"
            value={newKeyName}
            onChange={e => setNewKeyName(e.target.value)}
            className="w-full"
            placeholder="例如：name"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          合并文件
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold mb-2">合并结果：</h2>
            <Button variant="outline" asChild>
              <Link
                href={`data:text/csv;charset=utf-8,${encodeURIComponent(result)}`}
                download={`merged_data_${new Date().toISOString().split('T')[0]}.csv`}
              >
                下载
              </Link>
            </Button>
          </div>

          <pre className="p-4 rounded overflow-auto">
            {result}
          </pre>
        </div>
      )}
    </div>
  )
}
