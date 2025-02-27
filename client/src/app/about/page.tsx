import React from 'react'
import {Separator} from '@/components/ui/separator'

function page() {

  return (
    <div className="relative">
      <div className='absolute md:relative text-center mt-10'>
        <h1 className="text-5xl font-normal">
            <span className="font-bold">About us!</span>
        </h1>
      </div>
      <div className='grid absolute md:relative mx-5 mt-20 p-5 text-lg font-normal'>
        <p className='text-xl font-normal mt-5 text-center'>
          Bine ați venit la <span className='font-bold'>Medica</span>, partenerul dumneavoastră de încredere pentru sănătate și bunăstare! Suntem o platformă dedicată furnizării de medicamente și produse farmaceutice de calitate, cu scopul de a facilita accesul la tratamente sigure și eficiente.
        </p>
        <p className='text-xl font-normal mt-5 text-center'>
          <span className='font-bold'>Misiunea noastră</span> este de a oferi soluții complete și personalizate pentru nevoile dumneavoastră de sănătate, prin intermediul unui serviciu de calitate și profesionist. Echipa noastră de specialiști vă stă la dispoziție cu consultanță și suport tehnic, pentru a vă asigura că beneficiați de cele mai bune produse și tratamente.
        </p> 
      </div>
      <div>

      </div>
      <div className='inline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7 md:relative mx-5 mt-10 p-5'>
        <div className='flex flex-col gap-2 mt-10 bg-neutral-50 outline-solid rounded-lg shadow-md text-lg font-normal text-justify p-3'>
          <h2 className='text-xl font-bold'>
          🌿 Calitate și Siguranță
          </h2>
          <p className='text-xl font-normal'>
            Toate produsele noastre sunt atent selecționate și respectă standardele farmaceutice internaționale, astfel încât să vă oferim cele mai sigure soluții pentru nevoile dumneavoastră de sănătate.
          </p>
       </div>
       <div className='flex flex-col gap-2 mt-10 bg-neutral-50 outline-solid rounded-lg shadow-md text-lg font-normal text-justify p-3'>
          <h2 className='text-xl font-bold'>
          🚀 Livrare Rapidă și Discretă
          </h2>
          <p className='text-xl font-normal'>
          Înțelegem importanța timpului atunci când vine vorba de sănătate, de aceea asigurăm o livrare rapidă și discretă, direct la ușa dumneavoastră.
          </p>
       </div>
       <div className='flex flex-col gap-2 mt-10 bg-neutral-50 outline-solid rounded-lg shadow-md text-lg font-normal text-justify p-3'>
          <h2 className='text-xl font-bold'>
          💊 Gama Variată de Produse
          </h2>
          <p className='text-xl font-normal'>
          De la medicamente eliberate cu prescripție până la suplimente alimentare și produse de îngrijire personală, avem tot ce vă trebuie pentru a vă menține sănătatea în cea mai bună formă.
          </p>
       </div>
       <div className='flex flex-col gap-2 mt-10 bg-neutral-50 outline-solid rounded-lg shadow-md text-lg font-normal text-justify p-3'>
          <h2 className='text-xl font-bold'>
          📞 Suport Profesionist
          </h2>
          <p className='text-xl font-normal'>
          Echipa noastră de specialiști este mereu pregătită să vă ofere informații și sfaturi personalizate, pentru a vă ajuta să luați cele mai bune decizii pentru sănătatea dumneavoastră..
          </p>
       </div>
      </div>
    </div>
  )
}

export default page