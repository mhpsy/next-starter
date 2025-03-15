import * as XLSX from 'xlsx'

export async function mergeExcelFiles(files: File[], keyName: string, newKeyName: string): Promise<string> {
  try {
    // 存储所有文件的指定列数据
    let allData: any[] = []

    // 处理每个Excel文件
    for (const file of files) {
      // 读取文件内容
      const arrayBuffer = await file.arrayBuffer()
      const workbook = XLSX.read(arrayBuffer)

      // 获取第一个工作表
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]

      // 将工作表转换为JSON数据
      const jsonData = XLSX.utils.sheet_to_json(worksheet)

      // 只保留指定的列
      const filteredData = jsonData.map((row: any) => ({
        [keyName]: row[keyName],
      })).filter((item: any) => item[keyName] !== undefined)

      allData = [...allData, ...filteredData]
    }

    // 如果没有数据，抛出错误
    if (allData.length === 0) {
      throw new Error('No valid data found with the specified column name')
    }

    // 将数据中的列名从keyName改为newKeyName
    const renamedData = allData.map(item => ({
      [newKeyName]: item[keyName],
    }))

    // 创建新的工作表
    const newWorksheet = XLSX.utils.json_to_sheet(renamedData)
    const newWorkbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'MergedData')

    // 导出为CSV格式
    const csvContent = XLSX.utils.sheet_to_csv(newWorksheet)

    return csvContent
  }
  catch (error: any) {
    throw new Error(`Error processing Excel files: ${error.message}`)
  }
}
