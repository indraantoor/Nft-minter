import Link from 'next/link';

const InstallMetamask = () => {
  const METAMASK_URL = 'https://metamask.io/download.html';

  return (
    <div>
      <h3>Heres the link to install metamask</h3>
      <Link href={METAMASK_URL}>Meta Mask</Link>
    </div>
  );
};

export default InstallMetamask;
