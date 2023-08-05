import pkg from '@imgly/background-removal-node';
import path from 'node:path';
import { writeFile } from 'node:fs/promises';

const removeBackground = pkg.default; // why is this necessary

const images = [
  'https://images.unsplash.com/photo-1686002359940-6a51b0d64f68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
  'https://images.unsplash.com/photo-1590523278191-995cbcda646b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9'
];

const count = 1;
for (let i = 0; i < count; i++) {
  const randomImage = images[Math.floor(Math.random() * images.length)];
  console.time();
  const blob = await removeBackground(randomImage, {
    publicPath: `file://${path.resolve(
      `node_modules/@imgly/background-removal-node/dist`
    )}/`,
    debug: false
    // progress: (key, current, total) => {
    //   const [type, subtype] = key.split(':');
    //   console.debug(
    //     `${type} ${subtype} ${((current / total) * 100).toFixed(0)}%`
    //   );
    // }
  });
  console.timeEnd();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer, 'binary');
  await writeFile(`output_${i} of ${count}.png`, buffer);
}