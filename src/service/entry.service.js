import httpService from "./http.service";

const entryEndPoint = "entry/";

const entryService = {
  getAll: async () => {
    const { data } = await httpService.get(entryEndPoint);
    return data;
  },
  get: async (id) => {
    const { data } = await httpService.get(entryEndPoint + id);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(
      entryEndPoint + payload._id,
      payload
    );
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      entryEndPoint + payload._id,
      payload
    );
    return data;
  },
  delete: async (id) => {
    const { data } = await httpService.delete(entryEndPoint + id);
    return data;
  },
};

export default entryService;
