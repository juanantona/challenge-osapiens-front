import React from 'react';
import { Box, FormControl, NativeSelect } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import MuiLanguageIcon from '@mui/icons-material/Language';

const useStyles = makeStyles(() => ({
  select: {
    "& #language-selector": { 
      paddingRight: 8 
    }
  }
}));


const LanguageIcon = () => <MuiLanguageIcon color="primary" />

export const LanguageSelector = () => {
  const { t, i18n } = useTranslation("app");
  const theme = useTheme();
  
  const classes = useStyles();
  return(
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
          <option value={'en'}>{t("appHeader.languageSelector.english")}</option>
          <option value={'de'}>{t("appHeader.languageSelector.german")}</option>
        </NativeSelect>
      </FormControl>
    </Box>
  )
};