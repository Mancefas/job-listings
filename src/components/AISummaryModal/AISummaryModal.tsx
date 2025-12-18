import { Modal, ModalClose, Sheet, Stack, Typography } from '@mui/joy'
import {JobListingCommentType} from '../../Types/Types.ts'

type AISummaryModalProps = {
    data: JobListingCommentType | null
    open: boolean
    closeModal: () => void
}

const AiSummaryModal = ({data, open, closeModal}: AISummaryModalProps) => {
    if (!data) return null;

    const {projects, years_of_experience, coding_languages} = data

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={closeModal}
            sx={{ display: 'flex', flexDirection: column , justifyContent: 'center', alignItems: 'flex-start' }}
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
                    level="h4"
                    fontWeight="lg"
                    mb={1}
                >
                    Projects :
                </Typography>
                <Typography textColor="text.tertiary">
                    {projects.map((project) => (
                        <p>
                            {project}
                        </p>
                    ))}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography
                        component="h4"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                    >
                        Years needed:
                    </Typography>
                    <Typography textColor="text.tertiary">
                        {years_of_experience}
                    </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography
                        component="h4"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                    >
                        Coding languages:
                    </Typography>
                    <Typography textColor="text.tertiary">
                        {typeof coding_languages === 'string' ? coding_languages : coding_languages.map((coding_language) => (
                            <p>
                                {coding_language}
                            </p>
                        ))}
                    </Typography>
                </Stack>

            </Sheet>
        </Modal>
    )
}
export default AiSummaryModal
