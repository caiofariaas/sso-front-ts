import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Base URL para as requisições

// Definindo a estrutura dos dados de usuário esperados
interface UserAttributes {
  [key: string]: string;
}

interface UserInfo {
  id_token: string;
  access_token: string;
  user_attributes: UserAttributes;
}

const Profile: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/userinfo`);
        const userData: UserInfo = response.data;

        setUserInfo(userData);
        localStorage.setItem("access_token", userData.id_token);
      } catch (error) {
        console.error("Erro ao buscar informações do usuário:", error);
        setError("Erro ao buscar informações do usuário.");
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {userInfo ? (
        <div>
          <h1>Profile</h1>
          <span style={{ fontWeight: "bold" }}>Tokens:</span>
          <ul>
            <li>
              <span style={{ fontWeight: "bold" }}>id_token</span>:{" "}
              <span>{userInfo.id_token}</span>
            </li>
            <li>
              <span style={{ fontWeight: "bold" }}>access_token</span>:{" "}
              <span>{userInfo.access_token}</span>
            </li>
          </ul>
          <div>
            <span style={{ fontWeight: "bold" }}>User Attributes:</span>
            <ul>
              {userInfo.user_attributes &&
                Object.entries(userInfo.user_attributes).map(([key, value]) => (
                  <li key={key}>
                    <span style={{ fontWeight: "bold" }}>{key}</span>:{" "}
                    <span>{value}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
