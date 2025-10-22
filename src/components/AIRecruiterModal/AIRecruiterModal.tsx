import { Modal, ModalClose, Typography, Sheet} from '@mui/joy'

export type dataFromApi = {
        "match_percentage": number,
        "summary": string,
        "strengths": string[],
        "missing_qualifications": string[],
        "overqualified_areas": string[],
        "recommendations": string
}

type PropTypes = {
    data: dataFromApi
    open: boolean
    closeModal: () => void
}

const AIRecruiterModal = ({data, open, closeModal}: PropTypes) => {
  if (!data) return;

  const { match_percentage, summary, strengths, missing_qualifications, overqualified_areas, recommendations } = data;
  
  return (
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
            component="h3"
            id="matching"
            level="h4"
            textColor={match_percentage > 75 ? "success.400" : match_percentage > 50 ? "warning.400" : match_percentage < 50 ? "danger.400" : 'text.tertiary'}
            fontWeight="lg"
            mb={1}
          >
            Matching {match_percentage}%
          </Typography>

          <Typography
            component="h4"
            id="summary"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Summary
          </Typography>
          <Typography textColor="text.tertiary">
            {summary}
          </Typography>

          <Typography
            component="h4"
            id="strengths"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Strengths
          </Typography>
          <Typography textColor="text.tertiary">
            {strengths}
          </Typography>

           <Typography
            component="h4"
            id="missing_qualifications"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Missing
          </Typography>
          <Typography textColor="text.tertiary">
            {missing_qualifications}
          </Typography>

           {overqualified_areas?.length > 0 && (
              <>
                <Typography
                component="h4"
                id="overqualified_areas"
                level="h4"
                textColor="inherit"
                fontWeight="lg"
                mb={1}
              >
                Overqualified at
              </Typography>
              <Typography textColor="text.tertiary">
                {overqualified_areas}
              </Typography>
            </>
           )}

          <Typography
            component="h4"
            id="recommendations"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Recommendations
          </Typography>
          <Typography textColor="text.tertiary">
            {recommendations}
          </Typography>
          
        </Sheet>
      </Modal>
  )
}

export default AIRecruiterModal