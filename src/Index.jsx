
import { useState } from "react";
import './basic.css'
import axios from "axios";
export default function Index() {


  const [endpoints, setEndpoints] = useState([
    { name: '', type: '' },
  ]);
  const [nombre, setNombre] = useState('');
  const [lenguaje, setLenguaje] = useState('');
  const addEndpoint = () => {
    setEndpoints([...endpoints, { name: '', type: '' }]);
  };

  const handleEndpointChange = (index, event) => {
    const { name, value } = event.target;
    const newEndpoints = [...endpoints];
    newEndpoints[index][name] = value;
    setEndpoints(newEndpoints);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Construir el XML
    const xmlData = `
      <data>
        <name>${nombre}</name>
        <lenguage>${lenguaje}</lenguage>
        <endpoints>
          ${endpoints.map(endpoint => ` <endpoint>
              <name>${endpoint.name}</name>
              <type>${endpoint.type}</type>
            </endpoint>
          `).join('')} </endpoints>
      </data>
    `;

    console.log(xmlData)

    // Realizar la solicitud POST con fetch
    try {
      const response = await axios.post('http://localhost:3000', xmlData, {
        headers: {
          'Content-Type': 'application/xml',
        }
      });

      // Manejar la respuesta aquí
      console.log('Respuesta:', response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="Contenedor">
        <h2 className="Titulo">Generador de microservicios</h2>
        <form onSubmit={handleSubmit}>
          <div className="basicos">
            <label>
              Nombre:
              <input
                type="text"
                className="inputs"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </label>

            <label>
              Lenguaje:
              <input
                type="text"
                className="inputs"
                value={lenguaje}
                onChange={(e) => setLenguaje(e.target.value)}
              />
            </label>
          </div>

          <br />
          <div className="tabla">
            <label className="basicos">Endpoints</label>
            <table className="tabla_item">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {endpoints.map((endpoint, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        name="name"
                        className="nombre"
                        value={endpoint.name}
                        onChange={(event) =>
                          handleEndpointChange(index, event)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="type"
                        className="tipo"
                        value={endpoint.type}
                        onChange={(event) =>
                          handleEndpointChange(index, event)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={addEndpoint}>
              Añadir Endpoint
            </button>
          </div>
          <br />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  )
}
