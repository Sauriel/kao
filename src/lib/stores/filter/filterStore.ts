import { writable } from 'svelte/store';

const infoMap = new Map<string, Map<string, string>>();

const matchingFilterPaths = writable<string[]>([]);

function addInfo(path: string, info: Map<string, string>) {
  infoMap.set(path, info);
}

function reset() {
  infoMap.clear();
  matchingFilterPaths.set([]);
}

function clearSearch() {
  matchingFilterPaths.set([]);
}

function search(searchTerm: string) {
  const term = searchTerm.toLowerCase();
  const result: string[] = [];
  infoMap.forEach((info, path) => {
    info.forEach((value, _key) => {
      if (value.toLowerCase().includes(term)) {
        result.push(path);
      }
    });
  });
  matchingFilterPaths.set(result);
}

function getInfo(path: string): Map<string, string> | undefined {
  return infoMap.get(path);
}

const filterStore = {
  subscribe: matchingFilterPaths.subscribe,
  clearSearch,
  getInfo,
  reset,
  addInfo,
  search,
  matchingFilterPaths,
};

export default filterStore;
