import { useState, useEffect } from "react";
import { Button } from '@mui/joy'
import {JobListingCommentType} from '../../Types/Types.ts'
import { getJobRecruiterComment, getShortJobSummary } from '../../helpers/apiCalls'
import LoadingWheel from "../LoadingSpinners/LoadingWheel";
import AIRecruiterModal, { dataFromApi } from "../AIRecruiterModal/AIRecruiterModal";
import AiSummaryModal from '../AISummaryModal/AISummaryModal.tsx'

type agent = "recruiter" | "more-to-come"

type PropTypes = {
  buttonText?: string
  market: string
  linkToAdd: string | undefined
  agent?: agent
}

const AIButton = ({buttonText, market, linkToAdd, agent }: PropTypes) => {
  const [open, setOpen] = useState<boolean>(false);
  const [shortSummary, setShortSummary] = useState<JobListingCommentType | null>(null)
  const [jobComment, setJobComment] = useState<dataFromApi | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true);
    setShortSummary(null);
    try {
      if (agent) {
        const dataWithAgent  = await getJobRecruiterComment(`${agent}/` + `${market + "/"}`, `${linkToAdd}`);
        if (dataWithAgent.error) {
          setLoading(false)
          throw new Error(dataWithAgent.error);
        } else {
            if (dataWithAgent.data){
                setJobComment(dataWithAgent.data);
            }
        }
      } else {
        const dataWithoutAgent = await getShortJobSummary(`${market + "/"}`, `${linkToAdd}`);
        if (dataWithoutAgent.error) {
          setLoading(false)
          throw new Error(dataWithoutAgent.error);
        } else {
            if (dataWithoutAgent) {
                setShortSummary(dataWithoutAgent);
            }
        }
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  const openModalWithData = () => {
    fetchData();
  }

    useEffect(() => {
        if (shortSummary) setOpen(true)
    },[shortSummary])

    useEffect(() => {
        if (jobComment) setOpen(true);
    }, [jobComment]);

  const closeModal = () => {
    setShortSummary(null)
    setError(null)
    setLoading(false)
    setOpen(false)
  }

  return (
    <>
      <Button className='job-item__ai-button' color="neutral"  variant="soft" size="sm" onClick={openModalWithData}>
        {!loading && !error && (buttonText)}
        {loading && !error && <LoadingWheel />}
        {!loading && error && (!shortSummary || !jobComment) && 'error'}
      </Button>
      {jobComment && <AIRecruiterModal data={jobComment} open={open} closeModal={closeModal} />}
      {shortSummary && (<AiSummaryModal data={shortSummary} open={open} closeModal={closeModal} />)}
    </>
  );
}

export default AIButton