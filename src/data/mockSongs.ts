import { Song, Playlist } from '../types/music';

export const INITIAL_SONGS: Song[] = [
  {
    id: 'song-1',
    title: 'Cắt Đôi Nỗi Sầu',
    artist: 'Tăng Duy Tân',
    album: 'Cắt Đôi Nỗi Sầu (Single)',
    duration: 185,
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3',
    genre: 'V-Pop',
    plays: 1420500,
    releaseYear: 2023,
    lyrics: [
      { time: 0, text: '🎵 [Dạo đầu âm nhạc]' },
      { time: 10, text: 'Cắt đôi nỗi sầu anh buông tay giã từ' },
      { time: 15, text: 'Để không vương vấn những tháng năm dại khờ' },
      { time: 20, text: 'Một lần đau đớn để cả đời khắc ghi' },
      { time: 26, text: 'Vì người quay lưng bước đi chẳng nghĩ suy' },
      { time: 32, text: 'Gió cuốn mây trôi về phương trời xa vắng' },
      { time: 38, text: 'Để lại trong tim giọt sương đêm lạnh lùng' },
      { time: 45, text: 'Em có vui không nơi phương trời rực nắng' },
      { time: 52, text: 'Hay cũng như anh ôm trọn những tiếc thương' },
      { time: 60, text: '🎵 [Điệp khúc bùng nổ - Drop âm nhạc]' },
      { time: 75, text: 'Cắt đôi nỗi sầu, cắt đứt dây tơ' },
      { time: 82, text: 'Chôn sâu ký ức, không còn ước mơ' },
      { time: 90, text: 'Từ nay về sau bước đi một mình' },
      { time: 98, text: 'Giữ trọn thanh xuân, đón ánh bình minh' },
      { time: 110, text: 'Dẫu biết mai này đời còn nhiều bão giông' },
      { time: 125, text: 'Nhưng tim này không còn đợi mong...' }
    ]
  },
  {
    id: 'song-2',
    title: 'Nơi Này Có Anh',
    artist: 'Sơn Tùng M-TP',
    album: 'm-tp M-TP',
    duration: 215,
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-chill-bro-494.mp3',
    genre: 'V-Pop',
    plays: 3890200,
    releaseYear: 2017,
    lyrics: [
      { time: 0, text: '🎵 [Giai điệu piano lãng mạn]' },
      { time: 12, text: 'Em là ai từ đâu bước đến nơi đây dịu dàng ấm áp' },
      { time: 18, text: 'Nụ cười em tựa như muôn đóa hoa xuân đang dần hé mở' },
      { time: 25, text: 'Từng ánh mắt chan chứa biết bao nhiêu ân cần ngọt ngào' },
      { time: 32, text: 'Làm con tim anh ngập tràn yêu thương ngỡ như giấc mơ' },
      { time: 40, text: 'Cầm tay anh đi qua từng mùa giông bão' },
      { time: 48, text: 'Dẫu đường tương lai muôn vàn chông gai' },
      { time: 56, text: 'Chỉ cần bên em trao nụ hôn say đắm' },
      { time: 64, text: 'Nơi này có anh luôn chở che đời em...' },
      { time: 76, text: '🎵 [Chorus - Điệp khúc ngọt ngào]' },
      { time: 88, text: 'Khắc sâu hình bóng em trong tâm trí này' },
      { time: 96, text: 'Mỗi sớm mai thức dậy nhìn thấy nụ cười em' },
      { time: 110, text: 'Mãi mãi một tình yêu không phai nhòa' }
    ]
  },
  {
    id: 'song-3',
    title: 'Waiting For You',
    artist: 'MONO',
    album: '22 (The Album)',
    duration: 202,
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-hazy-after-hours-132.mp3',
    genre: 'Synth-Pop',
    plays: 2450000,
    releaseYear: 2022,
    lyrics: [
      { time: 0, text: '🎵 [Synth-wave nhịp điệu hoài niệm 80s]' },
      { time: 10, text: 'Liệu giờ em có đang nhớ về một người?' },
      { time: 16, text: 'Từng cùng em đi qua bao góc phố quen' },
      { time: 22, text: 'Ánh đèn vàng chiếu soi hạt mưa tí tách rơi' },
      { time: 28, text: 'Anh lặng thầm đứng ngắm nụ cười của em' },
      { time: 35, text: 'Giờ thì người đã bước đi thật xa xôi' },
      { time: 42, text: 'Để lại căn phòng vắng và bao nỗi nhớ đong đầy' },
      { time: 50, text: 'I am waiting for you... every single day' },
      { time: 58, text: 'Chờ đợi một phép màu đưa em quay về đây' },
      { time: 70, text: '🎵 [Guitar Solo lôi cuốn]' },
      { time: 85, text: 'Dẫu biết hy vọng thật mong manh như sương sớm' },
      { time: 95, text: 'Nhưng trái tim này vẫn một lòng chờ mong em' }
    ]
  },
  {
    id: 'song-4',
    title: 'Đưa Nhau Đi Trốn',
    artist: 'Đen ft. Linh Cáo',
    album: 'Indie Tuyển Chọn',
    duration: 240,
    coverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3',
    genre: 'Indie Việt',
    plays: 3100200,
    releaseYear: 2016,
    lyrics: [
      { time: 0, text: '🎵 [Tiếng guitar mộc mạc & gió lộng]' },
      { time: 12, text: 'Bố em hút rất nhiều thuốc, mẹ em khóc mắt lệ nhòa' },
      { time: 18, text: 'Gia đình thì cứ trách móc sao em không kiếm người tử tế' },
      { time: 25, text: 'Anh thì nghèo khó áo vá, túi rỗng không một xu dính túi' },
      { time: 33, text: 'Nhưng lòng này có đủ nắng ấm để sưởi ấm mùa đông buốt giá' },
      { time: 42, text: 'Thôi thì ta gom hết những mệt nhoài cất vào ba lô' },
      { time: 50, text: 'Đưa nhau đi đến nơi chân trời xa xôi hoang vắng' },
      { time: 60, text: 'Nơi chỉ có tiếng sóng biển và ngọn lửa ấm nồng nàn' },
      { time: 72, text: 'Đưa nhau đi trốn... trốn khỏi thành phố ồn ào' },
      { time: 85, text: 'Đưa nhau đi trốn... tìm lại tự do ngày nào' }
    ]
  },
  {
    id: 'song-5',
    title: 'Lofi Sài Gòn Mưa',
    artist: 'ChillHop Vietnam',
    album: 'Midnight Coffee Session',
    duration: 175,
    coverUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-cat-walk-371.mp3',
    genre: 'Lofi Chill',
    plays: 890400,
    releaseYear: 2024,
    lyrics: [
      { time: 0, text: '🎵 [Tiếng mưa rơi tí tách bên thềm cửa sổ]' },
      { time: 15, text: 'Giai điệu lofi nhẹ nhàng thư giãn' },
      { time: 30, text: 'Tách cà phê ấm nghi ngút khói thơm' },
      { time: 50, text: 'Gác lại mọi lo âu của cuộc sống bận rộn' },
      { time: 70, text: 'Lắng nghe từng nốt nhạc bình yên sâu lắng' },
      { time: 95, text: 'Thư giãn tâm trí và tận hưởng từng phút giây' },
      { time: 120, text: 'Âm nhạc chữa lành tâm hồn bạn hôm nay' }
    ]
  },
  {
    id: 'song-6',
    title: 'Bật Tình Yêu Lên',
    artist: 'Hòa Minzy & Tăng Duy Tân',
    album: 'Giai Điệu Tình Yêu',
    duration: 198,
    coverUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-raising-me-higher-34.mp3',
    genre: 'V-Pop',
    plays: 2150000,
    releaseYear: 2023,
    lyrics: [
      { time: 0, text: '🎵 [Intro vui tươi sống động]' },
      { time: 10, text: 'Chẳng biết tự bao giờ em thầm thương nhớ trộm' },
      { time: 16, text: 'Hình bóng một chàng trai có nụ cười tỏa nắng' },
      { time: 24, text: 'Chạm nhẹ vào ánh mắt tim loạn nhịp bồi hồi' },
      { time: 32, text: 'Bật tình yêu lên thôi ngại ngùng chi nữa người ơi' },
      { time: 42, text: 'Ta cùng nhau khiêu vũ dưới ánh trăng thơ mộng' },
      { time: 55, text: 'Bật tình yêu lên đi... ta say đắm cả đời này!' }
    ]
  },
  {
    id: 'song-7',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3',
    genre: 'Synthwave',
    plays: 5820000,
    releaseYear: 2020,
    lyrics: [
      { time: 0, text: '🎵 [High-energy 80s synthesizer theme]' },
      { time: 14, text: "I've been trying to call, I've been on my own for long enough" },
      { time: 22, text: "Maybe you can show me how to love, maybe" },
      { time: 30, text: "I'm going through withdrawals, you don't even have to do too much" },
      { time: 38, text: "You can turn me on with just a touch, baby" },
      { time: 47, text: "I look around and Sin City's cold and empty" },
      { time: 54, text: "No one's around to judge me" },
      { time: 61, text: "I can't see clearly when you're gone" },
      { time: 68, text: "I said, ooh, I'm blinded by the lights!" }
    ]
  },
  {
    id: 'song-8',
    title: 'Hạ Còn Vương Nắng',
    artist: 'DatKaa',
    album: 'Giai Thoại Mùa Hạ',
    duration: 210,
    coverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-valley-sunset-127.mp3',
    genre: 'Acoustic',
    plays: 1670000,
    releaseYear: 2021,
    lyrics: [
      { time: 0, text: '🎵 [Tiếng sáo trúc & đàn tranh du dương]' },
      { time: 14, text: 'Khi ánh hoàng hôn dần buông xuống cuối chân trời xa' },
      { time: 22, text: 'Tiếng ve sầu râm ran gọi mùa hạ cũ đã qua' },
      { time: 30, text: 'Kỷ niệm ngày xưa ta trao nhau bao lời hẹn ước' },
      { time: 38, text: 'Giờ chỉ còn là những ký ức nhạt nhòa theo thời gian' },
      { time: 50, text: 'Hạ còn vương nắng trên mái tóc em bay' },
      { time: 62, text: 'Gửi ngàn yêu thương vào theo làn gió mây...' }
    ]
  },
  {
    id: 'song-9',
    title: 'Chill Night Acoustic',
    artist: 'Vũ. & Friends',
    album: 'Một Vạn Năm',
    duration: 190,
    coverUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-sun-and-his-daughter-580.mp3',
    genre: 'Acoustic',
    plays: 1120000,
    releaseYear: 2022,
    lyrics: [
      { time: 0, text: '🎵 [Tiếng guitar gảy mộc mạc]' },
      { time: 12, text: 'Đêm nay thành phố thật tĩnh lặng' },
      { time: 24, text: 'Chỉ có anh cùng tiếng đàn ngân nga' },
      { time: 38, text: 'Nhớ từng ánh mắt nụ cười em trao' },
      { time: 52, text: 'Ấm áp tựa như những vì sao trên cao' },
      { time: 68, text: 'Dẫu xa xôi muôn trùng khoảng cách' },
      { time: 82, text: 'Trái tim vẫn hướng về một phương trời' }
    ]
  },
  {
    id: 'song-10',
    title: 'Electronic Horizon (Remix)',
    artist: 'Hoaprox',
    album: 'Vietnam EDM Wave',
    duration: 220,
    coverUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-game-level-music-689.mp3',
    genre: 'EDM',
    plays: 2890000,
    releaseYear: 2023,
    lyrics: [
      { time: 0, text: '🎵 [Build-up điện tử sôi động]' },
      { time: 16, text: 'Feel the bass through your veins!' },
      { time: 30, text: 'Raise your hands up to the sky!' },
      { time: 45, text: '3... 2... 1... DROP THE BASS!' },
      { time: 60, text: '🎵 [EDM festival synth lead & heavy bassline]' },
      { time: 90, text: 'Âm nhạc kết nối hàng triệu trái tim tuổi trẻ!' }
    ]
  }
];

export const INITIAL_PLAYLISTS: Playlist[] = [
  {
    id: 'pl-top-vietnam',
    title: 'Top 50 Nhạc Việt Thịnh Hành',
    description: 'Tuyển tập những ca khúc V-Pop hot nhất đang làm mưa làm gió trên các bảng xếp hạng.',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    songIds: ['song-1', 'song-2', 'song-3', 'song-6', 'song-8'],
    createdAt: '2025-01-15'
  },
  {
    id: 'pl-lofi-chill',
    title: 'Lofi Thư Giãn & Học Bài',
    description: 'Giai điệu lofi êm dịu giúp tập trung học tập, làm việc và thư giãn cuối ngày.',
    coverUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=80',
    songIds: ['song-5', 'song-8', 'song-9', 'song-4'],
    createdAt: '2025-02-01'
  },
  {
    id: 'pl-indie-acoustic',
    title: 'Indie & Acoustic Việt Nam',
    description: 'Những nốt nhạc mộc mạc, lời ca tự sự chạm sâu vào tâm hồn người nghe.',
    coverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80',
    songIds: ['song-4', 'song-9', 'song-8'],
    createdAt: '2025-02-10'
  },
  {
    id: 'pl-party-edm',
    title: 'Sôi Động - EDM & Synthwave',
    description: 'Năng lượng tràn trề với những nhịp bass mạnh mẽ xua tan mọi mệt mỏi.',
    coverUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80',
    songIds: ['song-1', 'song-3', 'song-7', 'song-10'],
    createdAt: '2025-02-20'
  }
];

export const GENRES = [
  { id: 'V-Pop', name: 'V-Pop', color: 'from-rose-500 to-pink-600', icon: '🎤' },
  { id: 'Indie Việt', name: 'Indie Việt', color: 'from-emerald-500 to-teal-600', icon: '🎸' },
  { id: 'Lofi Chill', name: 'Lofi Chill', color: 'from-indigo-500 to-purple-600', icon: '☕' },
  { id: 'Acoustic', name: 'Acoustic', color: 'from-amber-500 to-orange-600', icon: '🪕' },
  { id: 'Synth-Pop', name: 'Synth-Pop', color: 'from-cyan-500 to-blue-600', icon: '🎹' },
  { id: 'EDM', name: 'EDM Sôi Động', color: 'from-fuchsia-500 to-rose-600', icon: '⚡' },
];

export const ARTISTS = [
  {
    name: 'Sơn Tùng M-TP',
    followers: '10.5M',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bio: 'Nghệ sĩ tiên phong âm nhạc đương đại Việt Nam với hàng loạt bản hit kỷ lục.'
  },
  {
    name: 'Tăng Duy Tân',
    followers: '4.8M',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    bio: 'Hit-maker sở hữu các giai điệu bắt tai gây sốt khắp mạng xã hội châu Á.'
  },
  {
    name: 'MONO',
    followers: '3.2M',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    bio: 'Hiện tượng âm nhạc trẻ với phong cách biểu diễn cuốn hút và phong cách 80s.'
  },
  {
    name: 'Đen',
    followers: '6.4M',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
    bio: 'Rapper mang lại những giai điệu mộc mạc và triết lý sống gần gũi, ấm áp.'
  },
  {
    name: 'The Weeknd',
    followers: '25.0M',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    bio: 'Ngôi sao quốc tế hàng đầu thế giới với dòng nhạc R&B và Synthwave thời thượng.'
  }
];
