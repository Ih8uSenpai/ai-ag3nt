import { createTheme } from "@mui/material";
import { ruRU as coreRuRU } from "@mui/material/locale";
import type { PaletteOptions, ThemeOptions } from "@mui/material/styles";

export const baseTheme: ThemeOptions = {
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: 1024,
          paddingLeft: 16,
          paddingRight: 16,
          width: "95%",
          margin: "0 auto",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: "monospace",
          columnGap: "4px",
        },
        startIcon: {
          marginRight: 0,
          marginLeft: 0,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textTransform: "none",
          textDecoration: "none",
          color: "#FFF",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "monospace",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        action: {
          marginTop: 0,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {},
      },
    },
  },
  shape: {
    borderRadius: 4,
  },
};

const light: PaletteOptions = {
  mode: "light",

  primary: {
    main: "#3A7BFF", // Яркий, но не резкий синий
    light: "#7BA6FF", // Мягкий светлый синий
    dark: "#1E5FD9", // Глубокий темно-синий
    contrastText: "#FFFFFF", // Белый текст для лучшей читаемости
  },
  secondary: {
    main: "#9C6CFF", // Приятный фиолетовый с синим оттенком
    light: "#C2A5FF", // Нежный светлый фиолетовый
    dark: "#6C40D4", // Насыщенный темный фиолетовый
    contrastText: "#FFFFFF", // Белый текст для контраста
  },
  background: {
    default: "#0A0A12", // Темный фон с легким синим оттенком
    paper: "#1A1A2E", // Более светлый тон для карточек
  },
  text: {
    primary: "#FFFFFF", // Основной белый текст
    secondary: "#4DFFDB", // Светло-бирюзовый для акцентов
    disabled: "#6B6B8A", // Приглушенный серо-синий для неактивных элементов
  },
  success: {
    main: "#00C853", // Зеленый для успешных действий
  },
  error: {
    main: "#FF3D00", // Ярко-оранжевый для ошибок
  },
  warning: {
    main: "#FFC107", // Золотистый для предупреждений
  },
};

export const theme = createTheme(
  {
    palette: { ...light },
  },
  coreRuRU
);
