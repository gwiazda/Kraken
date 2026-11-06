# RoasTime sample files (made up)

Examples of the files RoasTime 4 writes for the Aillio Bullet R2 PRO, for building and testing the roast import.

- `roastime-roast.example.json`: one roast (`roast-time/roasts/<uid>`, no file extension in real life).
- `roastime-bean.example.json`: one bean from RoasTime's bean library (`roast-time/beans/<uid>`).

**All values are invented.** The keys and value types match two real roast files and one real bean file
the owner provided on 2026-11-06. Real files are about 100–130 KB, because each curve
(`beanTemperature` and so on) has one value per half-second (`sampleRate: 2`); these examples have 10.
The roast's `beanId` matches the bean's `uid`, as in real data.

Never commit real roast or bean files: the repo is public.
