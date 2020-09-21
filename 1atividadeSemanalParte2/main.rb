class AnalyzerLine
    attr_accessor :numberLine, :content
    def initialize (numberLine, content)
        @numberLine = numberLine
        @content = content
        @wordsMoreFreq = {}
    end

    def analyzeFreq()
        line = @content
        freq = line.split.each_with_object(Hash.new(0)) { |word, hash| hash[word] += 1 }
        freqValue = freq.max_by{
            |key, value| value
        }
        # puts(freqValue[1])
        @wordsMoreFreq = {freqValue[0] => freqValue[1]}
    end

    def to_str 
        return "Numero da linha: #{@numberLine}\nConteúdo da linha: #{@content}, Palavras com mais frequência: #{@wordsMoreFreq}\n\n"
    end
end

lines = File.readlines("text.txt")
linesInstantiated = Array.new
lines.each_with_index { |line, i| linesInstantiated.push(AnalyzerLine.new(i+1, line)) }
linesInstantiated.each do |instance|
    instance.analyzeFreq() 
    print instance.to_str
end

# file = AnalyzerLine.new(1, 'me chamo renan renan')
# file.analyzeFreq()