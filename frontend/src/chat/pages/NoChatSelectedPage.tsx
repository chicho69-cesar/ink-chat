export default function NoChatSelectedPage() {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold'>
          No hay un chat seleccionado
        </h1>
        
        <p className='text-muted-foreground'>
          Por favor, selecciona un chat de la lista de contactos a la izquierda.
        </p>
      </div>
    </div>
  )
}
