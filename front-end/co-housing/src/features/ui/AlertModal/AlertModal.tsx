interface AlertModalProps {
    open: boolean;
    onClose: () => void;
    message: string;
  }
  
  export function AlertModal({ open, onClose, message }: AlertModalProps) {
    if (!open) return null;
  
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}
      >
        <div
          style={{
            background: "#fefefe",
            padding: "25px 30px",
            borderRadius: "12px",
            textAlign: "center",
            minWidth: "280px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <h3 style={{ 
            marginBottom: "12px", 
            color: "#2c3e50", 
            fontSize: "1.4rem", 
            fontWeight: 700 
          }}>
            Aviso
          </h3>
          <p style={{ 
            color: "#34495e", 
            fontSize: "1rem", 
            lineHeight: "1.5" 
          }}>
            {message}
          </p>
          <button
            onClick={onClose}
            style={{ 
              marginTop: "20px", 
              padding: "8px 18px", 
              borderRadius: "8px", 
              cursor: "pointer", 
              backgroundColor: "#3498db", 
              color: "white", 
              fontWeight: 600,
              border: "none",
              transition: "background-color 0.2s"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2980b9")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3498db")}
          >
            Aceptar
          </button>
        </div>
      </div>
    );
  }
  