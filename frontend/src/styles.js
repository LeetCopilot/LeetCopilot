export const styles = {
    container: {
        width: '100vw',
        height: '100vh',
        padding: '5vw',
        backgroundColor: '#343B39'
      },
    navbar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: '0 2rem'
    },
    title: {
        fontSize: '1.5rem',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 900,
        color: 'white',
        marginTop: '1rem',
    },
    titleHighlight: {
        color: 'darkorange'
    },
    rightHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '1rem'
      },
      menuDot: (color) => ({
        width: '1.5rem',
        height: '1.5rem',
        backgroundColor: color,
        margin: 0,
        borderRadius: '100%',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0.25rem'
    }),
    textAreaContainer: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80vw',
    },
    bobbingDivContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '1.5rem',
        height: '1.5rem',
        backgroundColor: '#121F33',
        marginLeft: '10vw',
        marginBottom: '0.5rem',
        borderRadius: '45%',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.5)'
    },
    innerCircle: {
        width: '1rem',
        height: '1rem',
        backgroundColor: 'darkorange',
        borderRadius: '100%',
        boxShadow: 'inset 0px 1px 2px rgba(0,0,0,0.5)'
    },
    highlightLarge: {
        position: 'absolute',
        top: '25%',
        right: '30%',
        width: '15%',
        height: '15%',
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderRadius: '100%',
        boxShadow: '0px 1px 2px rgba(0,0,0,0.3)'
    },
    highlightSmall: {
        position: 'absolute',
        top: '32.5%',
        right: '27.5%',
        width: '10%',
        height: '10%',
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderRadius: '100%',
        boxShadow: '0px 1px 2px rgba(0,0,0,0.3)'
    },
    textArea: {
        border: '1px solid #000',
        borderRadius: '10px',
        padding: '10px',
        color: 'white',
        width: '100%',
        height: '5rem',
        resize: 'none',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        marginBottom: '1rem',
    },
    button: {
        position: 'absolute',
        bottom: '1rem',
        right: '-1rem',
        backgroundColor: 'transparent',
        color: 'darkorange'
    },
};
