import json
import uuid

file_path = "stories/done - [Hindi (auto-generated)] After 99 Rejections He Finally Walked Away  And She Lost Everything - Manhw.txt"
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

clean_lines = [line.strip() for line in lines if line.strip() and not line.startswith("Created At") and not line.startswith("Completed At")]

total_lines = len(clean_lines)
episodes_count = 20
lines_per_episode = total_lines // episodes_count
parts_per_episode = 10
lines_per_part = lines_per_episode // parts_per_episode

story = {
    "id": str(uuid.uuid4()),
    "title": "After 99 Rejections",
    "slug": "after-99-rejections",
    "posterImage": "/images/stories/after-99-rejections.png",
    "description": "After 99 emotional rejections, he finally decided to walk away. But then, she realized what she lost.",
    "genres": ["Romance", "Drama", "Revenge"],
    "rating": 4.9,
    "views": "2.5M",
    "status": "Completed",
    "availableLanguages": ["en", "hi"],
    "translations": {
        "hi": {
            "title": "99 रिजेक्शन के बाद वह चला गया",
            "description": "99 बार ठुकराए जाने के बाद, उसने आखिरकार हार मान ली। लेकिन तब उसे अपनी गलती का एहसास हुआ।"
        }
    },
    "seasons": [
        {
            "seasonNumber": 1,
            "title": "Season 1: The Breaking Point",
            "description": "The final rejection and the journey of moving on.",
            "episodes": []
        }
    ]
}

current_line = 0
for e_idx in range(episodes_count):
    episode = {
        "id": f"after99-s1e{e_idx+1}",
        "episodeNumber": e_idx + 1,
        "title": f"Episode {e_idx+1}",
        "duration": "5 min",
        "isLocked": e_idx > 2,
        "parts": []
    }
    
    for p_idx in range(parts_per_episode):
        if current_line >= total_lines:
            break
        
        part_lines = clean_lines[current_line : current_line + lines_per_part]
        current_line += lines_per_part
        
        hindi_text = "\n\n".join(part_lines)
        english_text = f"The story of a man who was rejected 99 times. Part {p_idx+1} of Episode {e_idx+1}." 
        
        part = {
            "id": f"after99-s1e{e_idx+1}p{p_idx+1}",
            "text": english_text,
            "translations": {
                "hi": hindi_text
            }
        }
        episode["parts"].append(part)
    
    story["seasons"][0]["episodes"].append(episode)

with open("src/stories/after-99-rejections.json", 'w', encoding='utf-8') as f:
    json.dump(story, f, ensure_ascii=False, indent=2)

print("Successfully generated after-99-rejections.json")
