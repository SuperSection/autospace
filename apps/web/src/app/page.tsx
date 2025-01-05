import { add } from '@autospace/sample-lib';

export default function Home() {
  return <main className="bg-primary">Autospace {add(2000, 25)}</main>;
}
