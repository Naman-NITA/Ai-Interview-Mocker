

"use client"

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [MockInterviewQuestinos, setMockInterviewQuestions] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    console.log(params.interviewId)
    GetInterviewDetails();
  }, [])

  let jsonMockResp;

  try {
    jsonMockResp = JSON.parse(result[0].jsonMockResp);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return;
  }

  // 🛠️ Handle both array and object structure
  if (Array.isArray(jsonMockResp)) {
    setMockInterviewQuestions(jsonMockResp); // Direct array
  } else if (jsonMockResp?.interviewQuestions && Array.isArray(jsonMockResp.interviewQuestions)) {
    setMockInterviewQuestions(jsonMockResp.interviewQuestions); // Object with array inside
  } else {
    console.warn("Unexpected structure for jsonMockResp", jsonMockResp);
    setMockInterviewQuestions([]); // fallback to empty
  }

  return (

    <div>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10 p-3'>
      <QuestionsSection 
        MockInterviewQuestinos={MockInterviewQuestinos}
        activeQuestionIndex={activeQuestionIndex}
      />
      <RecordAnswerSection  MockInterviewQuestinos={MockInterviewQuestinos} 
        activeQuestionIndex={activeQuestionIndex}

        interviewData={interviewData}
      />
    </div>
    <div className='flex justify-end gap-6'>
     {activeQuestionIndex>0 && <Button onClick={() => setActiveQuestionIndex (activeQuestionIndex-1)}>Previous Question</Button>}



     {activeQuestionIndex!=MockInterviewQuestinos?.length-1&& <Button onClick={() => setActiveQuestionIndex (activeQuestionIndex+1)}>Next Question</Button>}

  
          
    
      {activeQuestionIndex==MockInterviewQuestinos?.length-1&&
       <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
      <Button>End Interview</Button>

      </Link>}
    </div>

    </div>
  )
}

export default StartInterview
