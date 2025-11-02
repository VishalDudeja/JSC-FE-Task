// utils/datetime.ts

// Generate random date between two dates
export function getRandomDate(start: Date, end: Date): Date {
    const startTime = start.getTime();
    const endTime = end.getTime();
    const randomTime = startTime + Math.random() * (endTime - startTime);
    return new Date(randomTime);
  }
  
  // Format date to "DD/MM/YYYY hh:mm:ss AM/PM"
  export function formatDateTime(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // 0 => 12
  
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${day}/${month}/${year} ${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
  }
  