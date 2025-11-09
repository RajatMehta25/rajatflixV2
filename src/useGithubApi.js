import React, { useEffect } from "react";

const useGithubApi = (...args) => {
  useEffect(() => {
    fetch(args[0])
      .then((res) => res.json())
      .then((data) => {
        if (args[1]) args[1](data.data);
        if (args[2]) args[2](data.data[0].downloadLink ?? "");
        if (args[3]) args[3](data.data[0].name);
      });
  }, []);
};

export default useGithubApi;
