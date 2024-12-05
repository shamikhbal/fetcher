import pino from "pino";

const pino_log = pino(
  {
    level: "trace", // Set the desired log level
    timestamp: pino.stdTimeFunctions.isoTime, // Optional: Add timestamp
    transport: {
      target: "pino-pretty", // Use pino-pretty to format the logs
      options: {
        colorize: true, // Enable color output for better visibility in the terminal
        timestampKey: "time", // Customize the timestamp key
        translateTime: "SYS:standard", // Format the timestamp to a readable format
        ignore: "pid,hostname", // Optional: Exclude unnecessary fields
      },
    },
  },
  process.stdout
); // Ensure the logs are written to stdout (console)

const logger = (
  start: number,
  method: string,
  url: string,
  response: any,
  requestOptions: RequestInit
) => {
  if (response.ok) {
    pino_log.info(
      `[${Date.now() - start}ms] [${response.status}] [${method}] - ${url}`
    );
  } else {
    pino_log.error(
      `[${Date.now() - start}ms] [${response.status}] [${method}] - ${url}`
    );
  }
};

export default logger;
