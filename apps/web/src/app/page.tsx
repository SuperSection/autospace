import { add } from '@autospace/sample-lib';
import { BrandIcon } from '@autospace/ui/src/components/atoms/BrandIcon';

export default function Home() {
  return (
    <main className="">
      <BrandIcon />
      Autospace {add(2000, 25)}
    </main>
  );
}
