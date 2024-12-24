import React from "react";
import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";

const ModalCountDown = ({ seconds,stopRecord }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 100px)",
        width: "fit-content",
        position: "fixed",
        right: "10px",
        top: "15px",
      }}
    >
      <Card
        sx={{
          width: {
            sm: '200px',
            md: '300px',
            xl: '350px',
          },
          padding: "20px",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 0 20px 2px var(--primary-100, #cbcdf4)",
          height: "100%",
        }}
      >
        {/* Instruction Text */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" sx={{ mt: 2, mb: 5, fontWeight: "bold" }}>
            Instructions...
          </Typography>

          {/* Circle Button */}
          <IconButton
            sx={{
              width: {
                md: "6.5em",
                xl: "7.5em",
              },
              height:{
                md: "6.5em",
                xl: "7.5em",
              },
              borderRadius: "100%",
              backgroundColor: "#fff",
              boxShadow: "0 0 26px #1507b729",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ":hover": {
                backgroundColor: "#fff",
              },
            }}
          >
            {/* <MicIcon sx={{ fontSize: "40px", color: "#4a148c" }} /> */}

            <Box
              sx={{
                margin: 0,
                color: "#161616",
                fontWeight: "medium",
                fontSize: "2.5em",
              }}
            >
              <span>{seconds.toString().padStart(1, "0")}</span>
            </Box>
          </IconButton>
        </Box>

        {/* Bottom Button */}
        <Button
          variant="contained"
          size="large"
          sx={{
            mt: 4,
            backgroundColor: "#512da8",
            color: "white",
            textTransform: "none",
            borderRadius: "8px",
            width: "100%",
            ":hover": {
              backgroundColor: "#673ab7",
            },
            height: "50px",
          }}
          onClick={stopRecord}
        >
          Finish Recording
        </Button>
      </Card>
    </Box>
  );
};

export default ModalCountDown;
