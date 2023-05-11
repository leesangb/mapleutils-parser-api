import { useState } from 'react';

export default function Home() {
    const [name, setName] = useState('');
    const [pet, setPet] = useState<boolean>(false);
    const [equip, setEquip] = useState<boolean>(false);
    const [cash, setCash] = useState<boolean>(false);
    const [symbol, setSymbol] = useState<boolean>(false);

    const scopes = Object.entries({pet, equip, cash, symbol}).filter(([_, v]) => v).map(([scope]) => scope).join(',');
    const url = `/api/characters?name=${name}${scopes && `&scopes=${scopes}`}`;
    const isNameValid = !!name;

    return (
        <>
            <main>
                <h1>mapleutils api</h1>
                <a href={'https://github.com/leesangb/mapleutils-parser-api'}>github</a>
                <div className={'scopes'}>
                    <label>
                        캐릭터 이름
                        <input type={'text'} value={name} onChange={e => setName(e.target.value)}/>
                    </label>
                    <label>
                        <input type={'checkbox'} disabled={!isNameValid} checked={pet} onChange={e => setPet(e.target.checked)}/>
                    펫
                    </label>
                    <label>
                        <input type={'checkbox'} disabled={!isNameValid} checked={equip} onChange={e => setEquip(e.target.checked)}/>
                    장비
                    </label>
                    <label>
                        <input type={'checkbox'} disabled={!isNameValid} checked={cash} onChange={e => setCash(e.target.checked)}/>
                    캐시장비
                    </label>
                    <label>
                        <input type={'checkbox'} disabled={!isNameValid} checked={symbol} onChange={e => setSymbol(e.target.checked)}/>
                    심볼
                    </label>
                </div>
                {isNameValid && <>
                url <a target={'_blank'} href={url} rel="noreferrer">{url}</a>
                </>}
                <p>
                    주의: 같은요청 캐시 시간 5분
                </p>
                <p>
                    공홈 캐릭터 정보공개 설정 하러가기 <a href={'https://maplestory.nexon.com/MyMaple/Account/Character/Visibility'}>https://maplestory.nexon.com/MyMaple/Account/Character/Visibility</a>
                </p>
            </main>
        </>
    );
}
