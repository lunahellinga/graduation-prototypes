import {
  Box, Button,
  Card,
  CardContent,
  FormHelperText,
  Input,
  InputLabel, Typography
} from "@mui/material";


export default function Home() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card sx={{
        width: '400px',
        borderBottom: 2,
        borderColor: 'info.main',
        borderStartStartRadius: 0,
        borderStartEndRadius: 0,
        borderEndStartRadius: 20,
        borderEndEndRadius: 20
      }}>
        <Typography padding={'10px'} bgcolor={'primary.main'} variant="h4">Email Form</Typography>
        <CardContent>
          <form>
            <InputLabel htmlFor="my-input">Email</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" placeholder="your@email.here"/>
            <FormHelperText id="my-helper-text">Please enter your email</FormHelperText>
            <Button variant="contained" sx={{
              '&:hover': {
                bgcolor: 'info.main'
              },
            }} fullWidth={true}>Submit</Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
