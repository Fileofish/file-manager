import { showCurrentFolder } from "../../../shared/showCurrentFolder.mjs";
import os from 'os';

export function getCpus() {
  const amountCPUS = os.cpus().length;
  console.log(`The total number of CPUs is equal to ${amountCPUS}:`);
  os.cpus().forEach((cpu, index) => {
    const modelCPU = cpu.model;
    const clockRate = (cpu.speed / 1000).toFixed(2);
    console.log(`${index + 1}. CPU model is ${modelCPU}, clock rate ${clockRate} GHz`);
  })
  showCurrentFolder();
}