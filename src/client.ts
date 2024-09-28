import * as net from "net";

const SOCKET_PATH = "/tmp/rustpen_unix_socket/ts";

// Función para crear una instancia del cliente Unix y devolver sendMessage
export function createClientInstance() {
  // Crear la conexión al socket Unix
  const client = net.createConnection(SOCKET_PATH, () => {
    console.log(`Connected to server at ${SOCKET_PATH}`);
  });

  // Manejar datos recibidos desde el servidor
  client.on("data", (data) => {
    console.log(`Server says: ${data.toString()}`);
  });

  // Manejar el cierre de la conexión
  client.on("end", () => {
    console.log("Disconnected from server");
  });

  // Manejar errores de la conexión
  client.on("error", (err) => {
    console.error("Connection error:", err.message);
  });

  // Función para enviar mensajes al servidor
  function sendMessage(message: string) {
    if (message === "exit") {
      client.end(); // Cerrar la conexión si el mensaje es 'exit'
    } else {
      client.write(message); // Enviar el mensaje al servidor
    }
  }

  // Devolver solo la función sendMessage en un objeto
  return { sendMessage };
}
