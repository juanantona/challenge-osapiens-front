import { Grow, Box, Theme, Toolbar, Typography, FormControl, NativeSelect } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { User } from "../../api/services/User/store";
import AvatarMenu from "../AvatarMenu";
import MuiLanguageIcon from '@mui/icons-material/Language';

interface AppBarProps extends MuiAppBarProps {
  theme?: Theme;
}

interface AppHeaderProps {
  user: User;
  pageTitle: string;
}

const typoStyle = {
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
  lineHeight: 1
};

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  height: theme.tokens.header.height
}));

const useStyles = makeStyles(() => ({
  select: {
    paddingTop: 1,
    paddingBottom: 1,
    "&&": { paddingRight: 1 },
  }
}));

const LanguageIcon = () => <MuiLanguageIcon color="primary" />

const AppHeader = React.forwardRef<HTMLDivElement, AppHeaderProps>((props, ref) => {
  const { user, pageTitle } = props;
  const { t, i18n } = useTranslation("app");
  const theme = useTheme();

  const classes = useStyles();

  const [count, setCount] = useState(0);
  const hours = 1;
  const minutes = hours * 60;
  const seconds = minutes * 60;
  const countdown = seconds - count;
  const countdownMinutes = `${~~(countdown / 60)}`.padStart(2, "0");
  const countdownSeconds = (countdown % 60).toFixed(0).padStart(2, "0");

  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (countdown === 0) clearInterval(intervalRef.current);
  }, [countdown]);

  return (
    <AppBar ref={ref} position="fixed" sx={{ width: "100vw" }}>
      <Toolbar sx={{ background: "#08140C 0% 0% no-repeat padding-box" }}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6" component="div" color="primary">
              {countdownMinutes}:{countdownSeconds}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                ...typoStyle,
                color: theme.palette.primary.main,
                mb: theme.spacing(0.5)
              }}
              variant="h6"
              component="div"
            >
              {t("appTitle").toLocaleUpperCase()}
            </Typography>
            <Typography
              sx={{ ...typoStyle }}
              variant="overline"
              component="div"
              noWrap
            >
              {pageTitle.toLocaleUpperCase()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ mr: 4 }}>
              <FormControl>
                <NativeSelect
                  disableUnderline
                  id="language-selector"
                  IconComponent={LanguageIcon}
                  defaultValue={i18n.language}
                  classes={{ root: classes.select }}
                  sx={{ color: theme.palette.primary.main }}
                  onChange={(event) => {
                    i18n.changeLanguage(event.target.value);
                  }}
                >
                  <option value={'en'}>English</option>
                  <option value={'de'}>German</option>
                </NativeSelect>
              </FormControl>
            </Box>
            <Box sx={{ width: 40 }}>
              {user && user.eMail && (
                <Grow in={Boolean(user && user.eMail)}>
                  <AvatarMenu user={user} />
                </Grow>
              )}
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
});

export default AppHeader;
