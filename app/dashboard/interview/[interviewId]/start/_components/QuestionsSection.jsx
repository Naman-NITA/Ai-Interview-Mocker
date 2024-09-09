import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

const QuestionsSection = ({ MockInterviewQuestinos, activeQuestionIndex }) => {

   const textToSpeach=(text)=>{
       if('speechSynthesis' in window){
        const speech=new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech)
       }
       else{
        alert("Sorry, Your Browser does not support text to speech")
       }
   }

  return MockInterviewQuestinos&&(
    <div className='p-5 border rounded-lg my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {MockInterviewQuestinos && MockInterviewQuestinos.map((question, index) => (
          <h2
            key={index} // Unique key for each element
            className={`p-2 border rounded-full text-xs md:text-sm text-center cursor-pointer
              ${activeQuestionIndex === index ? 'bg-slate-600 text-white' : 'bg-slate-200 text-black'}`}
          >
            Question #{index + 1}
          </h2>
        ))}

     
       

      </div>

      <h2 className='my-5 text-md md:text-lg'>{MockInterviewQuestinos[activeQuestionIndex]?.question
      }</h2>


      <Volume2 className='cursor-pointer' onClick={() => textToSpeach(MockInterviewQuestinos[activeQuestionIndex]?.question)} />

      <div className='border rounded-lg p-5 text-blue-200 mt-20'>
        <h2 className='flex gap-2 items-center text-primary'>
          <Lightbulb/>
          <strong>Note :</strong>
        </h2>

         <h2 className='text-sm text-primary my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
      </div>

    </div>
  )
}

export default QuestionsSection
