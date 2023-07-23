const apiLink = 'http://127.0.0.1:5000';
import router from '../router';

export const handleLogin = async (email, password, setUser) => {
  try {
    const response = await fetch(`${apiLink}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      mode: 'cors',
    });

    if (response.ok) {
      const data = await response.json();
      setCookie('access_token', data.user.access, { expires: new Date(Date.now() + 2592000000) });
      setCookie('username', data.user.username, { expires: new Date(Date.now() + 2592000000) });
      setUser(data.user.username);
      router.push('/');
    } else {
      // Handle the case where the server returned an error
      console.error('Login failed');
    }
  } catch (error) {
    // Handle any error that occurred during the login request
    console.error(error);
  }
};

export const handleGetAllComments = async () => {
    try {
      const response = await fetch(`${apiLink}/api/v1/comments/all`, {
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors', 
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error(error);
    }
}

export const handlePost = async (body) => {
  const accessToken = getCookie('access_token');
  try {
    const response = await fetch(`${apiLink}/api/v1/comments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        body: body,
      }),
      mode: 'cors', // Set mode to 'cors' for enabling CORS
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.error('Login failed');
    }
  } catch (error) {
    console.error(error);
  }
};

export const handleLike = async (id) => {
  const accessToken = getCookie('access_token');
  try {
    const response = await fetch(`${apiLink}/api/v1/comments/like/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      mode: 'cors', 
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.error('Like request failed');
    }
  } catch (error) {
    console.error(error);
  }
};

export const handleDelete = async (id) => {
    const accessToken = getCookie('access_token');
    try {
      const response = await fetch(`${apiLink}/api/v1/comments/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Error: ' + response.status);
      }
  
      console.log('Resource deleted successfully!');
    } catch (error) {
      console.error(error.message);
    }
  };
  

export const handleRegister = async (email, username, password) => {
  try {
    const response = await fetch(`${apiLink}/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
      mode: 'cors', // Set mode to 'cors' for enabling CORS
    });

    if (response.ok) {
      const data = await response.json();
      // Handle the response from the server, e.g., store the authentication token, redirect, etc.
      router.push('/login');
      // fetchData(); // Call fetchData after successful login
    } else {
      // Handle the case where the server returned an error
      console.error('Sign up failed');
    }
  } catch (error) {
    // Handle any error that occurred during the login request
    console.error(error);
  }
};

export const fetchUser = async () => {
  const accessToken = getCookie('access_token');
  try {
    const response = await fetch(`${apiLink}/api/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      mode: 'cors', // Set mode to 'cors' for enabling CORS
    });

    if (response.ok) {
      const data = await response.json();
      // Return the username value
      return data.username;
    } else {
      // Handle the case where the server returned an error
      console.error('Failed to fetch user data');
    }
  } catch (error) {
    // Handle any error that occurred during the request
    console.error(error);
  }
};

export const getCookie = (name) => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName.trim() === name) {
      return cookieValue;
    }
  }
  return null;
};

export const setCookie = (name, value, options = {}) => {
  let cookieString = `${name}=${value}`;
  if (options.expires) {
    cookieString += `;expires=${options.expires.toUTCString()}`;
  }
  if (options.path) {
    cookieString += `;path=${options.path}`;
  }
  if (options.domain) {
    cookieString += `;domain=${options.domain}`;
  }
  if (options.secure) {
    cookieString += ';secure';
  }
  if (options.sameSite) {
    cookieString += `;SameSite=${options.sameSite}`;
  }
  document.cookie = cookieString;
};

export const deleteCookie = (name) => {
  setCookie(name, '', { expires: new Date(0) });
};
