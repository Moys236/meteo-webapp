const Loading = () => {
  const styles = {
    pContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
    },
    dot: {
      width: '12px',
      height: '12px',
      background: '#3498db',
      borderRadius: '50%',
      animation: 'bounce 1.4s infinite ease-in-out',
    },
    dot1: {
      animationDelay: '-0.32s',
    },
    dot2: {
      animationDelay: '-0.16s',
    },
    dot3: {
      animationDelay: '-0.06s',
    },
  };

  return (
    <>
      <style>
        {`
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
          }
        `}
      </style>
      <div style={styles.pContainer}>
        <div style={styles.container}>
            <div style={{ ...styles.dot, ...styles.dot1 }}></div>
            <div style={{ ...styles.dot, ...styles.dot2 }}></div>
            <div style={{ ...styles.dot, ...styles.dot3 }}></div>
            {/* <div style={styles.dot}></div> */}
        </div>
       </div>
    </>
  );
};

export default Loading;