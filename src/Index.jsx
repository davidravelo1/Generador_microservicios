

import { useState } from "react";
import './basic.css'
export default function Index() {


  const [endpoints, setEndpoints] = useState([
    { name: '', type: '' },
  ]);
  const addEndpoint = () => {
    setEndpoints([...endpoints, { name: '', type: '' }]);
  };

  const handleEndpointChange = (index, event) => {
    const { name, value } = event.target;
    const newEndpoints = [...endpoints];
    newEndpoints[index][name] = value;
    setEndpoints(newEndpoints);
  };
  return (
    <>
      <div className="Contenedor">
        <h2 className="Titulo">Generador de microservicios</h2>
        <form>
          <div className="basicos">
            <label>
              Nombre:
              <input type="text" className="inputs" />
            </label>

            <label>
              Lenguaje:
              <input type="text" className="inputs" />
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
