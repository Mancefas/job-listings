import { useState, useEffect } from "react";
import { Button, Modal, ModalClose, Typography, Sheet} from '@mui/joy'
import { getJobListings } from "../../helpers/apiCalls";
import LoadingWheel from "../LoadingSpinners/LoadingWheel";


const AIButton = ({ linkToAdd }: { linkToAdd: string | undefined }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [shortSummary, setShortSummary] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setShortSummary(null)
    try {
        // for now only cvbankas has this feature
      const data = await getJobListings(`cvbankas/${linkToAdd}`);
      
      if (data.error) {
        throw new Error(data.error);
      } else {
        setLoading(false)
        setShortSummary(data.data);
      }
    } catch (error: any) {
      setLoading(false)
      setError(error.message)
    }
  };

  const openModalWithData = () => {
    fetchData();
  }

//   open modal only when got data from fetch
  useEffect(() => {
    if (!shortSummary) return
    setOpen(true)
  },[shortSummary])

  const closeModal = () => {
    setShortSummary(null)
    setError(null)
    setLoading(false)
    setOpen(false)
  }

  return (
    <>
      <Button className='job-item__ai-button' color="neutral"  variant="soft" size="sm" onClick={openModalWithData}>
        {!loading && !error && 'Short summary'}
        {loading && !error && <LoadingWheel />}
        {!loading && error && !shortSummary && 'error'}
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={closeModal}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Job summary
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
          {/* 1+ years of experience in developing tools and systems for smart electricity meter administration; Experience working with the .NET framework; Knowledge of OOP; Experience working with SQL and REST API. */}
          {shortSummary}
          </Typography>
        </Sheet>
      </Modal>
    </>
  );
}

export default AIButton