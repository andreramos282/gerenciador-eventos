import axios from "axios"

async function putRequest<T, U>(url: string, body: U, query?: Record<string, string>): Promise<T | string> {
    try {
        const fullUrl = query
            ? `${url}?${new URLSearchParams(query).toString()}`
            : url

        const response = await axios.put<T>(fullUrl, body, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return response.data
    } catch (error: any) {
        console.error("Erro:", error)
        return error.response?.data?.error || error.message || 'Erro desconhecido'
    }
}

export default putRequest