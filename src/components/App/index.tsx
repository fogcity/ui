import { ThemeProvider, createUseStyles, JssProvider } from 'react-jss'
import { defaultStyle } from '../../constants/style'
import { theme, Theme } from '../../constants/theme'
type AppProps = {
  children: React.ReactNode
  customTheme?: Theme
}
const useDefaultStyle = createUseStyles(defaultStyle)

const App = ({ children, customTheme }: AppProps) => {
  useDefaultStyle()

  return (
    <JssProvider id={{ minify: true }}>
      <ThemeProvider theme={customTheme || theme}>
        <div
          style={{
            background: theme.color.greyLight,
          }}
        >
          {children}
        </div>
      </ThemeProvider>
    </JssProvider>
  )
}

export default App
