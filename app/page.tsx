"use client"
import { useState } from "react";

export default function Home(){
  const [tipo,setTipo] = useState("EMAIL")
  const [destinatario,setDestinatario] = useState("")
  const [mensagem,setMensagem] = useState("")
  const [resultado,setResultado] = useState("")
  const [loading,setLoading] = useState(false)

  async function enviar(e:any) {
    e.preventDefault()

    setLoading(true)
    setResultado("")

    try{
      const response = await fetch("http://localhost:8080/notificacoes",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          tipo,
          destinatario,
          mensagem
        })
      })
      const data = await response.json()
      setResultado(data.resultado)
      setDestinatario("")
      setMensagem("")
    } catch (error) {
      setResultado("Erro ao eviar notificação")
    }
    setLoading(false)
  }
  return(
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
          <div className='w-full max-w-xl bg-white rounded-2xl shadow-xl p-8'>
              <h1 className='text-3xl font-bold text-center text-slate-800'>Sistema de Notificações</h1>
                <p className='text-center text-gray-500 mt-2 mb-8'>
                  Envie notificações por Email, SMS ou Whatsapp
                </p>
                <form onSubmit={enviar} className='space-y-5'>
                <div>
                  <label className='block mb-2 font-medium'>Tipo</label>
                  <select value={tipo} onChange={(e)=>setTipo(e.target.value)} className='w-full border rounded-lg p-3 focus:outline-none focus:ring-blue-500'>
                  <option value="EMAIL">Email</option>
                  <option value="SMS">SMS</option>
                  <option value="WHATSAPP">WhatsApp</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-medium">Destinatario</label>
                  <input type="text" placeholder="Digite o email" value={destinatario} onChange={(e)=>setDestinatario(e.target.value)} className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div>
                  <label className="block mb-2 font-medium">Mensagem</label>
                  <textarea rows={5} value={mensagem} onChange={(e)=>setMensagem(e.target.value)} placeholder="Digite sua mensagem..." className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded cursor-pointer">{loading ? "Enviando...":"Enviar notificação"}</button>
                </form>
                {resultado && (
                  <div className={`mt-6 rounded-lg p-4 text-center font-medium ${resultado.toLowerCase().includes("Erro")? "bg-red-100 text-red-700":"bg-green-100 text-green-700"}`}>{resultado}</div>
                )}
          </div>
   </main>
  )
}