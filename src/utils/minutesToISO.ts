export default function minutesToISO(minutes: number) {
  return new Date(minutes * 60_000).toISOString();
}
