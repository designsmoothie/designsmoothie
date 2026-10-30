// Code-native illustrations describe a product type; they are not portfolio examples.
export default function MaterialArtwork({ kind = "menus" }: { kind?: string }) {
  return <div aria-hidden="true" className="flex h-full min-h-44 items-center justify-center overflow-hidden p-8">
    <svg viewBox="0 0 360 240" className="h-full max-h-60 w-full max-w-sm" fill="none">
      {kind === "menus" ? <>
        <rect x="34" y="38" width="292" height="155" rx="5" fill="#554e47" />
        <rect x="43" y="47" width="274" height="137" rx="2" fill="#f7f3ec" />
        {[64, 149, 234].map((x) => <g key={x}><rect x={x} y="67" width="62" height="55" rx="2" fill="#bfdc59" /><circle cx={x + 31} cy="94" r="17" fill="#f7f3ec" /><path d={`M${x} 140h60M${x} 151h40M${x} 165h50`} stroke="#958b82" strokeWidth="3" /></g>)}
        <path d="M150 195v15h60v-15M126 211h108" stroke="#554e47" strokeWidth="5" />
      </> : kind === "promotion" ? <>
        <path d="M83 208 105 38h144l23 170" stroke="#958b82" strokeWidth="4" />
        <rect x="100" y="30" width="155" height="174" rx="3" fill="#f7f3ec" />
        <rect x="116" y="47" width="123" height="76" rx="2" fill="#f6b55b" />
        <circle cx="177" cy="85" r="25" fill="#f7f3ec" />
        <path d="M120 143h115M120 158h85M120 180h115" stroke="#958b82" strokeWidth="4" />
      </> : <>
        <rect x="64" y="39" width="144" height="179" rx="2" transform="rotate(-9 64 39)" fill="#fffaf4" />
        <rect x="140" y="25" width="145" height="180" rx="2" transform="rotate(7 140 25)" fill="#ee8d9b" />
        <path d="m161 57 91 11m-94 8 65 8m-70 38 91 11m-94 8 70 8" stroke="#fffaf4" strokeWidth="5" />
        <rect x="81" y="154" width="120" height="68" rx="3" fill="#554e47" />
        <path d="M96 174h45m-45 13h80m-80 13h60" stroke="#f7f3ec" strokeWidth="3" />
      </>}
    </svg>
  </div>;
}
