import clientHttp from '@/services/clientHttp';
import { UserApp } from '@/model/bo/userApp';

export const login = async (username: string, password: string) => {
  const result = await clientHttp.post('/api/login', {
    username,
    password,
  });
  const user: UserApp = {
    id_user: result.data.user.id_utilisateur,
    utiPseudo: result.data.user.utiPseudo,
    utiRole: result.data.user.utiRole,
  };

  const sendObject = {
    user: user,
    token: result.data.token,
  };
  return sendObject;
};
