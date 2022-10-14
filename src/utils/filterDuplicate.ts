export function filterDuplicate<TypeData>(data: TypeData[]) {
  return [...new Set(data)];
}
