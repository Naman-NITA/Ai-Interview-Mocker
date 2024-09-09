// 'use client'

// import { db } from '@/utils/db';
// import { UserAnswerTable } from '@/utils/schema'
// import { eq } from 'drizzle-orm';
// import React, { useEffect, useState } from 'react'

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible"
// import { ChevronsUpDown } from 'lucide-react';


// const Feedback = ({params}) => {




//   const [feedbackList,setfeedbackList]= useState([]);

//   useEffect(() =>{
// GetFeedback();
//   },[]);
   
//     const GetFeedback=async()=>{
//       const result=await db.select().from(UserAnswerTable).where(eq(UserAnswerTable.mockIdRef,params.interviewId)).orderBy(UserAnswerTable.id);

//       console.log(result);
//       setfeedbackList(result);
//     }

//   return (
//     <div>
//       <h2 className='text-3xl font-bold text-green-500'>Congratulation!</h2>

//       <h2 className='font-bold text-2xl'>
//         Here is Your interview feedback
//       </h2>
//       <h2 className='text-primary text-lg my-3'>
//         Your overall interview rating : <strong>
//           7/10
//         </strong>
//       </h2>

//       <h2 className='text-sm text-gray-500 '>Find below interview question with correct answer and feedback for improvement</h2>
        
//         {feedbackList&&feedbackList.map((item,index)=>(
//           <Collapsible key={index}>
//           <CollapsibleTrigger className='p-2 bg-secondary rounded-lg flex justify-center my-2 text-left gap-10 w-full'>{item.question} <ChevronsUpDown className='h-5 w-5'/></CollapsibleTrigger>
//           <CollapsibleContent>
//            <div className='flex flex-col gap-2'>
//             <h2 className='text-red-500 p-2 border  bg-red-50 rounded-lg'><strong >Rating: </strong>{item.rating}</h2>
//             <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-600'><strong>Your Answer: </strong>{item.userAns}</h2>

//             <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-700'><strong >Correct Answer: </strong>{item.correctAns}</h2>


//             <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-700'><strong >Feedback: </strong>{item. feedback}</h2>

            
//            </div>
//           </CollapsibleContent>
//         </Collapsible>
        
//         ))}

    

//     </div>
//   )
// }

// export default Feedback
'use client';

import { db } from '@/utils/db';
import { UserAnswerTable } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const router = useRouter();

  useEffect(() => {
    if (params?.interviewId) {
      GetFeedback();
    }
  }, [params]);

  const GetFeedback = async () => {
    try {
      setLoading(true); // Set loading state to true
      const result = await db
        .select()
        .from(UserAnswerTable)
        .where(eq(UserAnswerTable.mockIdRef, params.interviewId))
        .orderBy(UserAnswerTable.id);

      console.log(result);
      setFeedbackList(result);
    } catch (error) {
      console.error("Failed to fetch feedback", error);
    } finally {
      setLoading(false); // Ensure loading state is false after data fetch
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>; // Show loading screen
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8'>
      <div className='w-full max-w-6xl bg-white shadow-xl rounded-lg p-10'>
        {feedbackList.length === 0 ? (
          <h2 className='text-center text-gray-500'>No Interview Feedback Record Found</h2>
        ) : (
          <>
            <h2 className='text-5xl font-extrabold text-green-600 mb-6 text-center'>
              Congratulations!
            </h2>

            <h2 className='text-3xl font-semibold mb-6 text-center'>
              Here's Your Interview Feedback
            </h2>

            <h2 className='text-xl text-gray-700 mb-8 text-center'>
              Your overall interview rating:{" "}
              <strong className='text-green-500 text-2xl'>7/10</strong>
            </h2>

            <p className='text-lg text-gray-600 mb-10 text-center'>
              Below are the interview questions with your answers, the correct answers, and feedback for improvement:
            </p>

            <div className='space-y-6'>
              {feedbackList.map((item, index) => (
                <Collapsible key={index} className='bg-gray-100 rounded-lg'>
                  <CollapsibleTrigger className='p-4 bg-gray-100 rounded-lg flex justify-between items-center text-gray-700 hover:bg-gray-200 transition-all duration-300'>
                    <span>{item.question}</span>
                    <ChevronsUpDown className='h-6 w-6 text-gray-500' />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className='p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-inner mt-2'>
                      <h3 className='text-red-600 font-medium'>
                        <strong>Rating: </strong>{item.rating}
                      </h3>
                      <p className='p-3 bg-red-100 border border-red-300 rounded-lg text-sm mt-2 text-red-700'>
                        <strong>Your Answer: </strong>{item.userAns}
                      </p>
                      <p className='p-3 bg-green-100 border border-green-300 rounded-lg text-sm mt-2 text-green-700'>
                        <strong>Correct Answer: </strong>{item.correctAns}
                      </p>
                      <p className='p-3 bg-blue-100 border border-blue-300 rounded-lg text-sm mt-2 text-blue-700'>
                        <strong>Feedback: </strong>{item.feedback}
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </>
        )}
      </div>

      <Button onClick={() => router.replace('/dashboard')} className='mt-8'>
        Go Home
      </Button>
    </div>
  );
};

export default Feedback;
