import cliProgress from "cli-progress";

// create a new progress bar instance and use shades_classic theme
export const processBar = new cliProgress.SingleBar({
    format: ' {bar} | {value}/{total} | {filename}',
}, cliProgress.Presets.rect);

// processBar.start(100, 1)
// start the progress bar with a total value of 200 and start value of 0
// bar1.start(200, 0);

// update the current value in your application..
// bar1.update(100);

// stop the progress bar
// bar1.stop();