import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Base URL para as requisições

const ResourceFetcher: React.FC = () => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const fetchResource = async () => {
      const token = localStorage.getItem("access_token");

      if (token) {
        try {
          const response = await axios.get<string>(`${API_BASE_URL}/resource`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setData(response.data);
        } catch (error: any) {
          console.error(
            "Erro ao acessar recurso protegido:",
            error.response ? error.response.data : error.message
          );
        }
      } else {
        console.error("Token não encontrado no localStorage.");
      }
    };

    fetchResource();
  }, []);

  return (
    <div>
      <h1>Recurso Protegido</h1>
      <div>
        <ul>
          <li>
            <span>{data}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResourceFetcher;
